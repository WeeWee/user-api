import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  CakeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeEuropeAfricaIcon,
  HomeIcon,
  InboxIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
interface Name {
  title: string;
  first: string;
  last: string;
}

interface Street {
  number: number;
  name: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
}

interface Login {
  username: string;
  password: string;
}

interface Dob {
  date: Date;
  age: number;
}

interface Registered {
  date: Date;
  age: number;
}

interface Picture {
  large: string;
}

interface Result {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  picture: Picture;
  nat: string;
}

interface User {
  results: Result[];
}
export const loader: LoaderFunction = async () => {
  const data = await fetch(`https://randomuser.me/api/`);
  const { results } = (await data.json()) as User;
  console.log(results);
  return results;
};
export default function Index() {
  const results = useLoaderData<Result[]>();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {results.map((user) => (
        <article
          key={user.login.username}
          className="flex flex-col items-center w-1/2 py-6 border rounded-lg shadow-xl"
        >
          <img
            src={user.picture.large}
            className="w-40 h-40 border-2 rounded-full"
          />
          <div>
            <p className="text-gray-600">Hi, My name is</p>
            <h1 className="text-xl font-semibold">{`${user.name.first} ${user.name.last}`}</h1>
          </div>
          <button
            className="flex items-center justify-center"
            onClick={handleShow}
          >
            More Info{" "}
            {show ? (
              <ChevronUpIcon className="w-6 h-6 mt-1" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 mt-1" />
            )}
          </button>
          <div
            className={`${
              show ? `` : `hidden`
            } flex flex-col items-center w-full`}
          >
            <div className="flex flex-col justify-start">
              <p className="flex items-center gap-1 font-semibold">
                <InboxIcon className="w-6 h-6" />
                {user.email}
              </p>
              <p className="flex items-center gap-1">
                <CakeIcon className="w-6" />
                {user.dob.age} years old
              </p>

              <p className="flex items-center gap-1 font-semibold">
                <GlobeEuropeAfricaIcon className="w-6 h-6" />
                {user.location.country}
              </p>
              <p className="flex items-center gap-1">
                <MapIcon className="w-6 h-6" />
                {user.location.city}
              </p>
              <p className="flex items-center gap-1">
                <HomeIcon className="w-6 h-6" />
                {user.location.street.name} {user.location.street.number}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
