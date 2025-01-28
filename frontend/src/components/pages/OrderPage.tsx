import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { Book } from "@/types/Book";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

// Zod schema for validation
const shippingAddressSchema = z.object({
  street: z.string().trim().nonempty("Street is required"),
  city: z.string().trim().nonempty("City is required"),
  state: z.string().trim().nonempty("State is required"),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code")
    .nonempty("ZIP Code is required"),
  country: z.string().trim().nonempty("Country is required"),
});

type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;

interface CartItem {
  book: Book;
  quantity: number;
}

const OrderForm = () => {
  const location = useLocation();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { fetchCart } = cartContext;
  const { items } = location.state || { items: [] };
  console.log(items);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressSchema),
  });

  const onSubmit = async (data: ShippingAddressFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/orders/create-order`,
        {
          shippingAddress: data,
          items,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({
          title: "Order created successfully!",
          description: "Your order has been placed.",
        });
        fetchCart();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Order creation failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-4 bg-gray-100">
      <CardHeader>
        <CardTitle>Create Order</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Cart Summary Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Your Cart Items
          </h2>
          {items?.length > 0 ? (
            <ul className="space-y-4">
              {items.map((item: CartItem) => (
                <li
                  key={item.book._id}
                  className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    width={50}
                    height={70}
                    className="rounded object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {item.book.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      by {item.book.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Shipping Address Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="addressLine1"
                className="block text-sm font-medium text-gray-700"
              >
                Address Line 1
              </label>
              <Input
                id="addressLine1"
                placeholder="123 Main St"
                {...register("street")}
                className={errors.street && "border-red-500"}
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Input
                  id="city"
                  placeholder="City"
                  {...register("city")}
                  className={errors.city && "border-red-500"}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Input
                  id="state"
                  placeholder="State"
                  {...register("state")}
                  className={errors.state && "border-red-500"}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP Code
                </label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  {...register("zipCode")}
                  className={errors.zipCode && "border-red-500"}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <Input
                  id="country"
                  placeholder="Country"
                  {...register("country")}
                  className={errors.country && "border-red-500"}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <CardFooter className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="default"
              className="bg-[#98F9B3] text-black hover:bg-[#98F9B3]/90"
            >
              Place Order
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
