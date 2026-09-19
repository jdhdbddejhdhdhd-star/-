import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, MenuItem, Category, OrderStatus, OrderRating } from '../types';
import { MENU_ITEMS as defaultMenuItems, CATEGORIES as defaultCategories } from '../data/menuData';

// Firestore collection references
const ORDERS_COL = 'orders';
const MENU_COL = 'menu_items';
const CATEGORIES_COL = 'categories';

// ================= ORDERS SERVICES =================

// Create or submit a new customer order
export async function submitOrderToFirebase(order: Order): Promise<void> {
  const orderRef = doc(db, ORDERS_COL, order.id);
  // Clean undefined fields for Firestore compatibility
  const sanitized = JSON.parse(JSON.stringify({
    ...order,
    timestamp: Date.now(),
    serverTime: serverTimestamp(),
  }));
  await setDoc(orderRef, sanitized);
}

// Update order status (received -> preparing -> ready -> served)
export async function updateOrderStatusInFirebase(orderId: string, status: OrderStatus): Promise<void> {
  const orderRef = doc(db, ORDERS_COL, orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: new Date().toISOString(),
    statusTimestamp: Date.now(),
  });
}

// Submit customer order rating to Firebase after order is completed
export async function submitOrderRatingInFirebase(orderId: string, rating: OrderRating): Promise<void> {
  const orderRef = doc(db, ORDERS_COL, orderId);
  const ratingPayload = JSON.parse(JSON.stringify({
    ...rating,
    timestamp: Date.now(),
  }));
  await updateDoc(orderRef, {
    rating: ratingPayload,
    ratedAt: new Date().toISOString(),
  });
}

// Real-time listener for all orders (for Waiter & Cashier dashboards)
export function subscribeToOrders(onUpdate: (orders: Order[]) => void): () => void {
  const q = query(collection(db, ORDERS_COL), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((d) => {
      orders.push(d.data() as Order);
    });
    onUpdate(orders);
  }, (err) => {
    console.warn('Orders subscription fallback:', err);
  });
}

// Real-time listener for a specific order by ID
export function subscribeToOrderById(orderId: string, onUpdate: (order: Order | null) => void): () => void {
  const orderRef = doc(db, ORDERS_COL, orderId);
  return onSnapshot(orderRef, (snap) => {
    if (snap.exists()) {
      onUpdate(snap.data() as Order);
    } else {
      onUpdate(null);
    }
  }, (err) => {
    console.warn('Order subscription fallback:', err);
  });
}

// Real-time listener for a specific table's current order
export function subscribeToTableOrder(tableNumber: string, onUpdate: (order: Order | null) => void): () => void {
  const q = query(collection(db, ORDERS_COL), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    let foundOrder: Order | null = null;
    snapshot.forEach((d) => {
      const o = d.data() as Order;
      // Match table and non-closed or most recent
      if (o.tableNumber === tableNumber && !foundOrder) {
        foundOrder = o;
      }
    });
    onUpdate(foundOrder);
  }, (err) => {
    console.warn('Table order subscription fallback:', err);
  });
}

// ================= MENU & CATEGORY SYNC & CRUD =================

// Real-time listener for menu items (with fallback to defaultMenuItems if empty or loading)
export function subscribeToMenuItems(onUpdate: (items: MenuItem[]) => void): () => void {
  return onSnapshot(collection(db, MENU_COL), (snapshot) => {
    if (snapshot.empty) {
      // If collection not yet populated, provide defaults
      onUpdate(defaultMenuItems);
    } else {
      const items: MenuItem[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...(d.data() as Omit<MenuItem, 'id'>) });
      });
      onUpdate(items);
    }
  }, (err) => {
    console.warn('Menu items subscription error, using static list:', err);
    onUpdate(defaultMenuItems);
  });
}

// Save or Update a Menu Item (Cashier Only)
export async function saveMenuItemInFirebase(item: MenuItem): Promise<void> {
  const itemRef = doc(db, MENU_COL, item.id);
  const data = JSON.parse(JSON.stringify(item));
  await setDoc(itemRef, data, { merge: true });
}

// Delete a Menu Item (Cashier Only)
export async function deleteMenuItemInFirebase(itemId: string): Promise<void> {
  const itemRef = doc(db, MENU_COL, itemId);
  await deleteDoc(itemRef);
}

// Real-time listener for categories (with fallback)
export function subscribeToCategories(onUpdate: (cats: Category[]) => void): () => void {
  return onSnapshot(collection(db, CATEGORIES_COL), (snapshot) => {
    if (snapshot.empty) {
      onUpdate(defaultCategories);
    } else {
      const cats: Category[] = [];
      snapshot.forEach((d) => {
        cats.push({ id: d.id, ...(d.data() as Omit<Category, 'id'>) });
      });
      onUpdate(cats);
    }
  }, (err) => {
    console.warn('Categories subscription error:', err);
    onUpdate(defaultCategories);
  });
}

// Save or Update a Category (Cashier Only)
export async function saveCategoryInFirebase(category: Category): Promise<void> {
  const catRef = doc(db, CATEGORIES_COL, category.id);
  await setDoc(catRef, JSON.parse(JSON.stringify(category)), { merge: true });
}

// Delete a Category (Cashier Only)
export async function deleteCategoryInFirebase(categoryId: string): Promise<void> {
  const catRef = doc(db, CATEGORIES_COL, categoryId);
  await deleteDoc(catRef);
}

// Seed initial menu data if Firestore menu_items is empty or needs version upgrade
export async function seedInitialMenuIfEmpty(): Promise<void> {
  try {
    const metaRef = doc(db, 'system_meta', 'menu_version');
    const metaSnap = await getDoc(metaRef);
    const currentVersion = metaSnap.exists() ? metaSnap.data()?.version : null;

    if (currentVersion !== 'v3_official_menu') {
      // Clean up obsolete categories if they exist
      try {
        await deleteDoc(doc(db, CATEGORIES_COL, 'favorites'));
      } catch {
        // ignore
      }

      // Seed all 20 official categories
      for (const cat of defaultCategories) {
        await setDoc(doc(db, CATEGORIES_COL, cat.id), cat);
      }

      // Seed menu items in batches
      for (const item of defaultMenuItems) {
        await setDoc(doc(db, MENU_COL, item.id), item);
      }

      // Save version marker
      await setDoc(metaRef, { version: 'v3_official_menu', updatedAt: Date.now() });
    }
  } catch (err) {
    console.warn('Seed initial menu info error:', err);
  }
}
