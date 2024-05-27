import { PrismaClient } from "@prisma/client";
import TripForm from "@/components/TripForm";

// set up db connection via prisma
const db = new PrismaClient();

interface TripEditProps {
  params: { id: string };
}

export default async function TripEdit(props: TripEditProps) {
  // get trip id
  // console.log(props);
  const id = props.params.id;

  // load trip data via id
  const trip = await db.trip.findUnique({ where: { id: id } });

  if (!trip) return "Trip not found.";

  console.log(trip);

  return (
    // sir's HTML/Tailwind
    <div className="container mx-auto my-4 max-w-screen-md p-5 border border-2 border-black">
      <h1 className="text-2xl font-bold uppercase mb-4">Edit Trip</h1>
      <TripForm
        type="edit"
        id={id}
        destination={trip.destination}
        startDate={trip.startDate.toISOString().split("T")[0]}
        endDate={trip.endDate.toISOString().split("T")[0]}
        budget={trip.budget}
      />
    </div>
  );
}
