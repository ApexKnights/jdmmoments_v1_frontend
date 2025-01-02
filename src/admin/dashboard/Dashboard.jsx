import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import DashCards from './dashcards/DashCards'
import SaleTable from './saletable/SaleTable'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);
import { Bar, Pie } from "react-chartjs-2"
import { UserContext } from '../../context/userContext'

const Dashboard = () => {

    const { pvk_categories, diamond_categories } = useContext(UserContext)
    const [changetodiamond, setChangeToDiamond] = useState(false)

    const getNames = pvk_categories.map((e) => e.catname)
    const getProducts = pvk_categories.map((e) => e.products.length)
    const getdNames = diamond_categories.map((e) => e.catname)
    const getdProducts = diamond_categories.map((e) => e.products.length)
    return (
        <div className='dashboard'>
            <DashCards />
            <div className="second-section">
                <div className="sale-table">
                    <h2>Your Overall Sale Details</h2>
                    <SaleTable />
                </div>

                <div className="prod-chart">
                    <div className="butts">
                        <button className='chart-open-buttons' onClick={() => setChangeToDiamond(false)}>PVk</button>
                        <button className='chart-open-buttons' onClick={() => setChangeToDiamond(true)}>Diamond</button>
                    </div>
                    {
                        changetodiamond ? <div className="diamond-chart">
                            <h2>Diamond categories and products</h2>
                            <Bar className='chart' data={{
                                labels: getdNames,
                                datasets: [{
                                    label: 'Categories',
                                    data: getdProducts,
                                    backgroundColor: [
                                        "#F7EBE0",
                                        "#3C3D37",
                                        '#453757',
                                        '#C1F2B0'
                                    ]
                                }]
                            }} />
                        </div> : <div className="pvk-chart">
                            <h2>Pvk categories and products</h2>
                            <Bar className='chart' data={{
                                labels: getNames,
                                datasets: [{
                                    label: 'Categories',
                                    data: getProducts,
                                    backgroundColor: [
                                        "#F7EBE0",
                                        "#3C3D37",
                                        '#453757',
                                        '#C1F2B0'
                                    ]
                                }]
                            }} />
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default Dashboard
