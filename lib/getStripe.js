import { loadStripe } from "@stripe/stripe-js"

const getStripe = async () => {
    const stripe = await loadStripe("pk_test_51ML8nqAroBsvlIB2fdPlvgcuv7ZYUrMBfjz7HELtdDmdIrj4izcHA6rCp0pSSkViAKdxlfqrbboQS9zZgLQWTlJs00tw8SEkVe")
    return stripe
}

export default getStripe