import testprod1 from "../assets/testprod1.jpg"
import testprod2 from "../assets/testprod2.jpg"

export const pvk = [
    {
        id: 1,
        name: "Jhumka",
        feature_img: testprod1,
        prods: [
            {
                img: testprod2,
                prodname: "Polki",
                free: true,
                buy: true,
            },
            {
                img: testprod2,
                prodname: "Victorian",
                free: false,
                buy: true,
            },
            {
                img: testprod2,
                prodname: "Kundan",
                free: false,
                buy: true,
            },
        ],
        price: "240",
    },
    {
        id: 2,
        name: "Necklece",
        feature_img: testprod2,
        prods: [
            {
                img: testprod1,
                prodname: "Polki",
                free: true,
            },
            {
                img: testprod1,
                prodname: "Victorian",
                free: false,
            },
            {
                img: testprod2,
                prodname: "Kundan",
                free: false,
            },
        ],
        price: "250",
    },
    {
        id: 3,
        name: "Bajuband",
        feature_img: testprod1,
        prods: [
            {
                img: testprod2,
                prodname: "Polki",
                free: true,
            },
            {
                img: testprod2,
                prodname: "Victorian",
                free: false,
            },
            {
                img: testprod2,
                prodname: "Kundan",
                free: false,
            },
        ],
        price: "250",
    }
]