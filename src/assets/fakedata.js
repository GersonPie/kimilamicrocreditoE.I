import { assets } from "./assets"
const avatar = assets.avatar
export const fakedata = [
    {
        id: "211dw1",
        name: "José Eduardo",
        avatar,
        loans: [
            {
                id: 32212,
                date: "21-Aug-2024",
                ammount: 900,
                deadline: "21-Sept-2024",
                payments: [
                    {
                        id: Math.random() * 100,
                        ammount: 600,
                        date: "23-Aug-2024",
                        
                    },
                    {
                        id: Math.random() * 100,
                        ammount: 200,
                        date: "21-Aug-2024",
                        
                    },
                    {
                        id: Math.random() * 100,
                        ammount: 600,
                        date: "24-Aug-2024",
                        
                    },
                ]
            }
        ]

    },
    {
        id: "212dwa1",
        name: "Eduardo Fusseka",
        avatar

    },
    {
        id: "21a11",
        name: "Eduardo Costa",
        avatar

    },
    {
        id: "211121",
        name: "Manuel Mussa",
        avatar

    },
]