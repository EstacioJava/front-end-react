'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react"

export default function HomePanel (tab: string) {
   const [allItems, setAllItems] = useState([]);
   const [materialsByCategory, setMaterialsByCategory] = useState([]);
   const [isDashboardLoading, setIsDashboardLoading] = useState(true);

   useEffect(() => {
      // getDashboardData();
   }, []);

   function getDashboardData () {
      setIsDashboardLoading(true);

      fetch('http://localhost:8080/storage')
      .then(response => response.json())
      .then(data => {
         setAllItems(data);
         setMaterialsByCategory(Array.from(new Set(data.map(item => item.name))));

         // for(let category of ) {
         //    const itemsFromSameCategory = data.filter(item => item.name === category)
            
         //    if (itemsFromSameCategory.length > 1) {
         //       const totalCategoryPrice = itemsFromSameCategory.reduce((a,b) => a.price + b.price);
         //       const newCostBar = {
         //          material: category,
         //          cost: totalCategoryPrice
         //       }

         //       // console.log(category, new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCategoryPrice));
         //       costByMaterial.push(newCostBar)
               
         //       // setCostByMaterial(old => [...old, newCostBar]);
         //       setCostByMaterial(costByMaterial);
         //    } else if (itemsFromSameCategory.length > 0) {
         //       // console.log(category, new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itemsFromSameCategory[0].price));
         //    }
         // }

         // setCostByMaterial(costByMaterial);
         // console.log('ALL', costByMaterial);
         setIsDashboardLoading(false);
      })

      
      // new Promise((res) => {
      //    setTimeout(() => {
      //       res({
      //          material_costs: [
      //             {
      //                material: 'MDF 3mm',
      //                cost: 180.0,
      //             },
      //             {
      //                material: 'MDF 6mm',
      //                cost: 120.45,
      //             },
      //             {
      //                material: 'MDF 8mm',
      //                cost: 60.22,
      //             },
      //             {
      //                material: 'MDF 10mm',
      //                cost: 60.19,
      //             },
      //             {
      //                material: 'MDF 18mm',
      //                cost: 0.0,
      //             }
      //          ],
      //          monthly_costs: [
      //             {
      //                month: 'Janeiro',
      //                cost: 1200.45,
      //             },
      //             {
      //                month: 'Fevereiro',
      //                cost: 615.45,
      //             },
      //             {
      //                month: 'Março',
      //                cost: 720.45,
      //             },
      //             {
      //                month: 'Abril',
      //                cost: 854.45,
      //             },
      //             {
      //                month: 'Maio',
      //                cost: 345.45,
      //             }
      //          ]
      //       });
      //    }, 1500)
      // }).then((data: DashboardData | unknown) => {
      //    if (data) {
      //       setDashboardData(data);
      //       setIsDashboardLoading(false);
      //    }
      // })
   }

   const MaterialCostBar = (category, price) => {
      return (
         <>
            <span className="col-start-1 text-lg font-semibold mr-3 whitespace-nowrap">{ category }</span>
            <div className="col-start-2 bg-slate-300 w-full rounded-md overflow-hidden">
               <span className="absolute ml-3 text-lg font-code font-bold opacity-75">R$ { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price) }</span>
               <span className="inline-block bg-orange-400 w-1/2 h-full"></span>
            </div>
         </>
      )
   }

   // function MaterialCosts () {
   //    if (isDashboardLoading) {
   //       return (
   //          <>
   //             <Skeleton className="col-start-1 mr-3 w-36 h-7 rounded-md bg-slate-200"/>
   //             <Skeleton className="col-start-2 w-full h-7 rounded-md bg-slate-200"/>
   //             <Skeleton className="col-start-1 mr-3 w-36 h-7 rounded-md bg-slate-200"/>
   //             <Skeleton className="col-start-2 w-full h-7 rounded-md bg-slate-200"/>
   //             <Skeleton className="col-start-1 mr-3 w-36 h-7 rounded-md bg-slate-200"/>
   //             <Skeleton className="col-start-2 w-full h-7 rounded-md bg-slate-200"/>
   //          </>
   //       )
   //    } else {
   //       if (costByMaterial) {
   //             return (
   //                <>
   //                   {/* <span className="col-start-1 text-lg font-semibold mr-3 whitespace-nowrap">{ item.material }</span> */}
   //                   <div className="col-start-2 bg-slate-300 w-full rounded-md overflow-hidden">
   //                      {/* <span className="absolute ml-3 text-lg font-code font-bold opacity-75">R$ { item.cost.toFixed(2).replace('.', ',') }</span> */}
   //                      <span className="inline-block bg-orange-400 w-1/2 h-full"></span>
   //                   </div>
   //                </>
   //             )
   //       } else {
   //          return (
   //             <li>No items</li>
   //          )
   //       }
   //    }
   // }

   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg bg-slate-50 p-5 space-y-4">
         <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-semibold">Início</h1>
         </div>

         <section className="border-2 border-slate-200 dark:border-slate-900 p-3 rounded-lg">
            <h2 className="text-2xl font-semibold">Custos por material</h2>

            <div className="grid grid-cols-[min-content_auto] grid-rows-[auto] gap-y-2 mt-3">
               {/* <MaterialCosts /> */}
               {/* { materialsByCategory.map(category => <MaterialCostBar category={category} price={allItems.filter(item => item.name === category).reduce((a,b) => a.price + b.price)} />) } */}
               {/* { allItems.length > 0 } */}
               {/* <MaterialCostBar category={'MDF 6mm'} price={allItems.filter(item => item.name === 'MDF 6mm').reduce((a,b) => a.price + b.price)} /> */}
               {/* <pre>{ JSON.stringify(materialsByCategory) }</pre> */}
            </div>
         </section>
      </section>
   )
}