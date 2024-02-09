import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const CheckoutForm = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() + 30));

  console.log(today);
  console.log(priorDate);

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment Success 🎉",
      timer: 4000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/`,
      },
      redirect: "if_required",
    });

    console.log(error);

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      handleSuccess();
      const update = doc(db, "users", data?.id);
      await updateDoc(update, {
        member: "VIP",
        member_date: priorDate,
      });
      navigate("/");
    }

    setIsProcessing(false);
  };

  return (
    <div className="px-52">
      <form
        className="border py-10 px-10 rounded-xl bg-[#E0D5D5] space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-main text-2xl ">Payment</h1>

        <div>
          <PaymentElement id="payment-element" className="w-full" />
          <div className="flex justify-end w-full">
            <button
              className="border mt-5 mr-10 bg-[#f20000] text-black font-main px-4 py-2 rounded-xl"
              disabled={isProcessing || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
              </span>
            </button>
          </div>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
