import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";
import { server } from "../main";

export const UserContext = createContext({});


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [pvk_categories, setPvk_Categories] = useState([])
    const [diamond_categories, setDiamond_Categories] = useState([])
    const [customers, setCustomers] = useState([])
    const [settings, setSettings] = useState({})
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        getUser()
    }, [])
    useLayoutEffect(() => {
        fetchPvkCategories()
    }, [])
    useLayoutEffect(() => {
        fetchDiamondCategories()
    }, [])
    useLayoutEffect(() => {
        fetchCustomers()
    }, [])
    useLayoutEffect(() => {
        fetchSettings()
    }, [])

    const getUser = async () => {
        try {
            const res = await axios.get(`${server}/auth/refetch`, { withCredentials: true })
            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        }
    }

    const fetchPvkCategories = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/pvk/get-categories`, { withCredentials: true });
            setPvk_Categories(res.data.response)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDiamondCategories = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/diamond/get-categories`, { withCredentials: true });
            setDiamond_Categories(res.data.response)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${server}/user/get-users`, { withCredentials: true });
            setCustomers(res.data.response)
        } catch (error) {

        }
    }
    const fetchSettings = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/settings/get-settings`, { withCredentials: true });
            setSettings(res.data.response[0])
            setLoading(false)
        } catch (error) {

        }
    }


    return (
        <UserContext.Provider value={{ user, setUser, pvk_categories, setPvk_Categories, diamond_categories, setDiamond_Categories, customers, settings, loading }}>
            {children}
        </UserContext.Provider>
    )
}