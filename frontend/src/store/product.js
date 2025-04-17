import { create } from "zustand";

export const useProductStore = create((set) => ({ 
    products : [],
    setProducts: (products) => set({ products }),
    createProduct : async (newProduct) => {
        if(newProduct.name === "" || newProduct.price === "" || newProduct.image === "") {
            return {success : false, message : "Please fill all fields."};
        }
    
        const token = localStorage.getItem("token"); // ✅ Get the token
    
        const res = await fetch("/api/products", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}` // ✅ Include in headers
            },
            body : JSON.stringify(newProduct)
        });
    
        const data = await res.json();
    
        if (!data.success) {
            return { success: false, message: data.message || "Something went wrong." };
        }
    
        set((state) => ({ products : [...state.products, data.data] }));
        return {success : true, message : "Product created successfully."};
    },
    
    // createProduct : async (newProduct) => {
    //     if(newProduct.name === "" || newProduct.price === "" || newProduct.image === "") {
    //         return {success : false, message : "Please fill all fields."};
    //     }
    //     const res = await fetch("/api/products", {
    //         method : "POST",
    //         headers : {
    //             "Content-Type" : "application/json"
    //         },
    //         body : JSON.stringify(newProduct)
    //     }); 
    //     const data = await res.json();
    //     set((state) => ({ products : [...state.products, data.data] }));
    //     return {success : true, message : "Product created successfully."};

    // },
    fetchProducts: async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        const data = await res.json();
        set({ products: data.data });
      },
      
    // fetchProducts : async() => {
    //     const res = await fetch("/api/products");
    //     const data = await res.json();
    //     set({ products : data.data });
    // },
    deleteProduct : async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method : "DELETE"
        });
        const data = await res.json();
        if(!data.success) {
            return {success : false, message : data.message};
        }
        // updates UI immediately without needing refreshing
        set((state) => ({ products : state.products.filter(product => product._id !== id) }));
        return {success : true, message : "Product deleted successfully."};
    },
    editProduct : async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if(!data.success) {
            return {success : false, message : data.message};
        }
        set((state) => ({ products : state.products.map(product => product._id === id ? data.data : product) }));
        return {success : true, message : "Product updated successfully."};
    }
 }));

