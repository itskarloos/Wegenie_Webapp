"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { ICategory } from '@/lib/database/models/category.model';
import { getAllCategories } from '@/lib/actions/category.actions';
  
const CategoryFilter = () => {

    const [categories,setCategories] = useState<ICategory[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        const getCategories = async () => {
          const categoryList = await getAllCategories();
    
          categoryList && setCategories(categoryList as ICategory[])
        }
    
        getCategories();
      }, [])


      
    // useEffect(()=>{
    //     const delayDebounceFn = setTimeout(()=>{
            
    //     return ()=> clearTimeout(delayDebounceFn);

    // },[categories,searchParams,router])

    const onSubmitCategory = (category: string)=>{
        let newUrl= '';
            if(category && category !== 'All'){
                 newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'category',
                    value: category
                })
            }
            else {
                newUrl= removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['category']
                })
            }
            router.push(newUrl,{scroll: false})
        }
    
    
  return (
    <Select onValueChange={(value:string)=>onSubmitCategory(value)}>
    <SelectTrigger className="select-field">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="All" className='select-item p-regular-14'>All</SelectItem>
     {categories.map((category)=>{
        return (
            <SelectItem key={category._id} value={category.name} className='select-item p-regular-14'>{category.name}</SelectItem>
        )
     })}
    </SelectContent>
  </Select>
  
  )
}

export default CategoryFilter