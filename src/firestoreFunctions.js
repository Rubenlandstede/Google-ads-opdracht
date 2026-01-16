import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const months = [
  "january", "february", "march", "april",
  "may", "june", "july", "august",
  "september", "october", "november", "december"
];

// functie die een jaar + alle 12 maanden maakt
export async function createYearWithMonths(year) {
  try {
    const yearRef = doc(db, "years", year.toString());

    // jaardocument
    await setDoc(yearRef, { createdAt: new Date() }, { merge: true });

    // elke maand
    for (const month of months) {
      const monthRef = doc(collection(yearRef, "months"), month);
      await setDoc(monthRef, { createdAt: new Date() }, { merge: true });
    }

    console.log(`Jaar ${year} met alle maanden aangemaakt!`);
  } catch (error) {
    console.error("FOUT:", error);
  }
}

// Klant toevoegen aan een specifiek jaar/maand
export async function addCustomerToMonth(year, month, customerData) {
  try {
    const yearRef = doc(db, "years", year.toString());
    const monthRef = doc(collection(yearRef, "months"), month.toLowerCase());
    const customerRef = collection(monthRef, "customers");

    await addDoc(customerRef, {
      ...customerData,
      createdAt: new Date(),
    });

    console.log("Klant toegevoegd aan maand!");
  } catch (error) {
    console.error("Klant toevoegen mislukt:", error);
  }
}


// Klant toevoegen aan algemene collectie
export async function addCustomer(customerData) {
  try {
    await addDoc(collection(db, "customers"), {
      ...customerData,
      createdAt: serverTimestamp()
    });
    console.log("Klant toegevoegd aan algemene collectie!");
  } catch (error) {
    console.error("Fout bij opslaan klant:", error);
    throw error;
  }
}


// Data opslaan in aparte collection,
export async function addCustomerData(customerId, data) {
  try {
    await addDoc(collection(db, "data"), {
      customerId,      // koppeling naar de klant
      ...data,         // de audit / ingevulde form data
      createdAt: serverTimestamp(),
    });
    console.log("Data succesvol opgeslagen!");
  } catch (error) {
    console.error("Fout bij opslaan data:", error);
    throw error;
  }
}



