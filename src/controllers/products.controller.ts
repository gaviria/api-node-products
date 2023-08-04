import { Request, Response } from "express"
import Product, { IProduct } from "../models/Product";

export const createProduct = async (req:Request, res:Response) => {
    const product = req.body;
    const newProduct: IProduct = new Product(product);
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved)
}

export const getProducts = async (req:Request, res:Response) => {
    const listProducts = await Product.find();
    res.status(200).json(listProducts);
}

export const getProductById = async (req:Request, res:Response) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
}

export const updateProductById = async (req:Request, res:Response) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {new: true});
    res.status(200).json(updatedProduct);
}

export const deleteProductById = async (req:Request, res:Response) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({message: "Producto Borrado", product:deletedProduct});
}