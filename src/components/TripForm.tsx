import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // ≈ Tanstack's invalidatQueries

// set up db connection via prisma
const db = new PrismaClient();

// ? makes field optional
interface TripFormProps {
  type: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  budget?: number | null;
  id?: string;
}

// fx to create trip in db
const createTrip = async (formData: FormData) => {
  "use server"; // tells nextjs to perform action in backend
  // console.log(formData);
  try {
    const destination = formData.get("destination") as string; // .get <input name>
    const startDate = formData.get("start_date") as string;
    const endDate = formData.get("end_date") as string;
    const budget = formData.get("budget") as string;
    // console.log(destination);

    // create new trip in db
    const trip = await db.trip.create({
      data: {
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseInt(budget), // '.' all .get() values parsed string
      },
    });
  } catch (error) {
    console.log(error);
  }
  // redirect home
  redirect("/");
};

// fx to update trip in db
const updateTrip = async (formData: FormData) => {
  "use server"; // tells nextjs to perform action in backend
  // console.log(formData);
  try {
    const destination = formData.get("destination") as string; // .get <input name>
    const startDate = formData.get("start_date") as string;
    const endDate = formData.get("end_date") as string;
    const budget = formData.get("budget") as string;
    const id = formData.get("id") as string;

    // update trip in db
    await db.trip.update({
      where: { id },
      data: {
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseInt(budget), // '.' all .get() values parsed as string
      },
    });
  } catch (error) {
    console.log(error);
  }

  // revalidate + redirect home
  revalidatePath("/");
  redirect("/");
};

export default function TripForm(props: TripFormProps) {
  const {
    type = "new",
    destination = "",
    startDate = new Date().toISOString().split("T")[0],
    endDate = new Date().toISOString().split("T")[0],
    budget = 0,
    id = "",
  } = props;

  return (
    // sir's HTML/Tailwind
    <form action={type === "new" ? createTrip : updateTrip}>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            type="text"
            name="destination"
            defaultValue={destination}
            placeholder="Enter your destination here"
            className="w-full border border-black rounded p-4"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              defaultValue={startDate}
              className="w-full border border-black rounded p-4"
            />
          </div>
          <div className="w-full">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              type="date"
              name="end_date"
              defaultValue={endDate}
              className="w-full border border-black rounded p-4"
            />
          </div>
        </div>
        <div>
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            type="number"
            name="budget"
            placeholder="1000"
            defaultValue={budget?.toString()}
            className="w-full border border-black rounded p-4"
          />
        </div>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-4 text-center"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
