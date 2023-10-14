import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  UsersObject,
  fetchUsers,
  isAdding,
  isEditing,
} from "@/store/users-slice";
import { useAppDispatch } from "@/store/hooks";

interface FormProps {
  user?: UsersObject | null;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be valid.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
});

function UserForm({ user }: FormProps) {
  const dispatch = useAppDispatch();

  const defaultFormValues = user
    ? {
        name: user.name,
        email: user.email,
        city: user.address.city,
        address: user.address.street,
      }
    : {
        name: "",
        email: "",
        city: "",
        address: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user) {
      const updatedUser = {
        name: values.name,
        email: values.email,
        address: {
          street: values.address,
          city: values.city,
        },
      };
      dispatch(fetchUsers({ actionType: "PUT", id: user._id, updatedUser }));
      dispatch(isEditing(false));
    } else {
      const newUser = {
        name: values.name,
        email: values.email,
        address: {
          street: values.address,
          city: values.city,
        },
      };
      dispatch(fetchUsers({actionType: 'POST', newUser}))
      dispatch(isAdding(false))
    }
  }

  const onFormCancel = () => {
    dispatch(isEditing(false));
    dispatch(isAdding(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-slate-100 text-black hover:bg-slate-200"
          >
            Submit
          </Button>
          <Button
            onClick={onFormCancel}
            className="bg-slate-100 text-black hover:bg-slate-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserForm;
