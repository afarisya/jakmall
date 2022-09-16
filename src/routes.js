import Delivery from "./components/Order/Delivery";
import Finish from "./components/Order/Finish";
import Payment from "./components/Order/Payment";

export const routes = [
    { id: 1, title: "Delivery", element: <Delivery />, path: "/delivery"},
    { id: 2, title: "Payment", element: <Payment />, path: "/payment"},
    { id: 3, title: "Finish", element: <Finish />, path: "/finish"},
]