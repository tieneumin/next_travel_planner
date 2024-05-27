import TripForm from "@/components/TripForm";

export default function TripNew() {
  return (
    // sir's HTML/Tailwind
    <div className="container mx-auto my-4 max-w-screen-md p-5 border border-2 border-black">
      <h1 className="text-2xl font-bold uppercase mb-4">New Trip</h1>
      <TripForm type="new" />
    </div>
  );
}
