import { Track } from "@/contexts/playerContext";
import { api } from "@/services/api";
import Image from "next/image";

interface IPageParams {
  params: { id: string };
}

export async function generateStaticParams() {
  try {
    const response = await api.get<Track[]>("/tracks", {
      params: {
        _limit: 5,
        _page: 1,
      },
    });

    return response.data.map((track) => ({ id: track.id + "" }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load posts");
  }
}


export default async function Page({ params }: IPageParams) {
  const response = await api.get<Track>(`tracks/${params.id}`);
  const track = response.data;

  return (
    <main>
      <h1>{track.name}</h1>
      <Image 
        src={track.cover} 
        alt={track.name} 
        width='300' 
        height={300}
      />
    </main>
  );
}