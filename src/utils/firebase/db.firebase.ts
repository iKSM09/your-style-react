import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { firebaseApp } from ".";
import { ProductDataTypes } from "../../store/products.store";
import { UserPostTypes } from "../../store/posts.store";

export const db = getFirestore(firebaseApp);

// Get User Data from db
export const getUserData = async (user: User) => {
  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
};

// Creating User collection in FireStore
export const createNewUserDoc = async (user: User, vendor: boolean) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user doc doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    const isVendor = vendor;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        isVendor,
      });
    } catch (error) {
      if (error instanceof Error)
        console.error(`error creating the user: ${error.message}`);
      else console.error("Unexpected error", error);
    }
  }
};

// Get all Collection Docs
export const getCollectionDocsFor = async (collectionID: string) => {
  const collectionRef = collection(db, collectionID);
  const collectionQuery = query(collectionRef);
  const collectionSnapshot = await getDocs(collectionQuery);

  return collectionSnapshot.docs.map((doc) => doc.data());
};

// Creating Product collection in FireStore
export const createNewProductDoc = async (product: ProductDataTypes) => {
  if (!product) return;
  // const path = product.category;
  const path = "products";

  const productDocRef = doc(db, path, product.id);
  const productSnapshot = await getDoc(productDocRef);

  // if product doc doesn't exist
  if (!productSnapshot.exists()) {
    try {
      await setDoc(productDocRef, product);
    } catch (error) {
      console.error(error);
    }
  }
};

// Creating User Post collection in FireStore
export const createNewUserPostDoc = async (post: UserPostTypes) => {
  if (!post) return;

  const path = "posts";

  const postDocRef = doc(db, path, post.id);
  const postSnapshot = await getDoc(postDocRef);

  // if post doc doesn't exist
  if (!postSnapshot.exists()) {
    try {
      await setDoc(postDocRef, post);
    } catch (error) {
      console.error(error);
    }
  }
};

// const product = {
//   category: "women/westernwear/tops",
//   colors: [
//     {
//       name: "Orange",
//       images: [
//         "https://firebasestorage.googleapis.com/v0/b/your-style-d1c5f.appspot.com/o/products%2F1688586282699277292700_1041515543119582_1122457239800954322_n.jpg?alt=media&token=62ba2657-2d0b-484b-a515-d9d103a741f8",
//         "https://firebasestorage.googleapis.com/v0/b/your-style-d1c5f.appspot.com/o/products%2F1688586284880277319145_272986608361339_1350633113256109152_n.jpg?alt=media&token=ce77aaf3-791d-4f3f-8960-ab71cb1f7984",
//         "https://firebasestorage.googleapis.com/v0/b/your-style-d1c5f.appspot.com/o/products%2F1688586287037277285039_106008702004621_1565083824792902295_n.jpg?alt=media&token=ee677f1f-2a73-4875-8c77-b9d7350df48b",
//         "https://firebasestorage.googleapis.com/v0/b/your-style-d1c5f.appspot.com/o/products%2F1688586283862277360566_1382394242174000_443366451496795765_n.jpg?alt=media&token=ec0ac115-1ea9-4383-9584-6a66a2c85e96",
//         "https://firebasestorage.googleapis.com/v0/b/your-style-d1c5f.appspot.com/o/products%2F1688586288241277365725_392348116051076_3973272375748403294_n.jpg?alt=media&token=f62c99fc-96aa-4b00-a688-4fba3d835988",
//       ],
//     },
//   ],
//   description:
//     'Orange muslin shirt featuring Shibori tie dyed pattern. Pair this top with your favourite pair of denims or trousers to complete the look.\n\nMaterial: Muslin\nColor- Orange\nTie-dyed\nShirt collar with placket\nShort roll-up sleeves\nFront Top Length:\\t23"\nBack Top Length:\\t25"\nSleeves Length:\\t10"\n\n\nWhat you get: Only Top (1 Pcs.)\n\nWash Care: Gentle hand wash separately in cold water with mild/liquid detergents. Avoid soaking for too long.\n\nModel Size: Model Is Wearing Size S\n\nModel Height: 5\'4"',
//   id: "3a3666f1-72e4-40bd-8694-6ac0b2681ece",
//   name: "Girls Top",
//   postedBy: "hellbird@cronus.com",
//   price: 999,
//   sizes: "sx, s, m, l, xl, 2xl, 3xl",
// };
