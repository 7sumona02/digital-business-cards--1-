import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Globe, MapPin, Linkedin, Twitter, Github } from "lucide-react"
import Link from "next/link"

export default async function CardPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch the business card data from Supabase
  const { data: card, error } = await supabase
    .from("business_cards")
    .select("*")
    .eq("slug", slug) // Assuming you add a `slug` column to the table
    .single();

  if (error || !card) {
    return notFound(); // Show a 404 page if the card is not found
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold mb-8">Digital Business Card</h1>

    <Card className="w-[350px] bg-white shadow-lg">
      <CardContent className="pt-6 px-6 relative">
        <div className="flex gap-4 justify-between">
          <div className="space-y-[6px]">
            <h3 className="text-lg font-semibold capitalize">{card.name}</h3>
            <p className="text-neutral-500 font-medium capitalize text-sm">{card.title}</p>
            <div className="border-t border-1 border-green-600 w-16"></div>
            <p className="text-sm text-green-600 capitalize">{card.company}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {card.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 text-green-600" />
              <span className="text-sm">{card.phone}</span>
            </div>
          )}
          {card.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 text-green-600" />
              <a href={`mailto:${card.email}`} className="text-sm hover:underline">
                {card.email}
              </a>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 text-green-600" />
              <a
                href={`https://${card.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                {card.website}
              </a>
            </div>
          )}
          {card.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 text-green-600" />
              <span className="text-sm">{card.address}</span>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-2 flex justify-center">
          <div className="flex space-x-2">
            {card.twitter && (
              <div className="p-2 rounded-full bg-green-100">
                <Link href={card.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="size-4 text-green-600" />
                </Link>
              </div>
            )}
            {card.linkedin && (
              <div className="p-2 rounded-full bg-green-100">
                <Link href={card.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4 text-green-600" />
                </Link>
              </div>
            )}
            {card.github && (
              <div className="p-2 rounded-full bg-green-100">
                <Link href={card.github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4 text-green-600" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-xs text-gray-500">
            Create your own digital business card at{" "}
            <Link href="/" className="text-green-600 hover:underline">
              EcoCard
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>

    <div className="mt-8 text-center max-w-md">
      <h2 className="text-lg font-semibold mb-2">Sustainable Networking</h2>
      <p className="text-sm text-gray-600">
        This digital business card helps reduce paper waste and promotes sustainability. Each digital card saves
        approximately 7.2g of paper and reduces water usage.
      </p>
    </div>
  </div>
  );
}