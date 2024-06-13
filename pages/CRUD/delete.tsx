import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DeleteActivityPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    date: "", 
    time: "", 
    adress: "",
  });

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(`/api/activities`);
      const data = await response.json();
      setActivity(data);
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  const handleDelete = async () => {
    const response = await fetch(`/api/activities`, {
      method: "DELETE"
    });

    if (response.ok) {
      // Activity deleted successfully
      router.push("/CRUD/[id]");
    } else {
      // Handle error
      alert("Failed to delete activity");
    }
  };

  return (
    <>
    <Header />
    <Head>
      <title>Activity</title>
    </Head>

      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Delete Activity</h1>
        </div>
        
        <form>
          <div className="my-12">
            Are you sure of deleting <strong>{activity?.name}</strong>?
          </div>
          <div className="flex w-full gap-2">
            <Link
              href="/"
              className="text-center bg-gray-300 hover:bg-opacity-80 text-black rounded-lg px-4 py-2 duration-200 w-full"
              passHref legacyBehavior
            >
              Cancel
            </Link>
            <button
              className="bg-red-500 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <Head>
        <title>Delete Activity</title>
      </Head>
      <Footer/>
    </>
  );
};

export default DeleteActivityPage;