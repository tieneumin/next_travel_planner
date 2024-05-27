import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // ≈ Tanstack's invalidatQueries

// set up db connection via prisma
const db = new PrismaClient();

interface TripDetailsProps {
  params: { id: string };
}

const deleteTrip = async (formData: FormData) => {
  "use server"; // tells nextjs to perform action in backend

  try {
    const id = formData.get("id") as string;

    // delete trip
    await db.trip.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }

  // revalidate + redirect home
  revalidatePath("/");
  redirect("/");
};

export default async function TripDetails(props: TripDetailsProps) {
  // get trip id
  // console.log(props);
  const id = props.params.id;

  // load trip data via id
  const trip = await db.trip.findUnique({ where: { id: id } });

  if (!trip) return "Trip not found.";

  return (
    // sir's HTML/Tailwind
    <div className="container mx-auto my-4 max-w-screen-sm p-5 border border-2 border-black">
      <h1 className="text-2xl font-bold uppercase mb-4">Trip Details</h1>
      <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>
      <p className="text-sm mb-2">
        Date: {trip.startDate.toISOString().split("T")[0]} -{" "}
        {trip.endDate.toISOString().split("T")[0]}
      </p>
      <p className="text-sm mb-6">Budget: RM{trip.budget}</p>
      <div className="flex justify-center gap-4">
        <Link
          href={"/trips/" + trip.id + "/edit"}
          className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
        >
          Edit Details
        </Link>
        <form action={deleteTrip}>
          <input type="hidden" name="id" value={id} />
          <button className="p-2 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out">
            Remove Trip
          </button>
        </form>
      </div>
    </div>
  );
}
