import { auth, redirectToSignIn } from "@clerk/nextjs";
import { CompanionForm } from "./components/companion-form";
import prismadb from "@/lib/prismadb";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const {userId} = auth();
  //TODO: check subscription

  if(!userId) return redirectToSignIn();
  const companion = await prismadb.companion.findUnique({
    where: {
      userId,
      id: params.companionId,
    },
  });
  const categories = await prismadb.category.findMany();

  return (
    <div>
      <CompanionForm initialData={companion} categories={categories} />
    </div>
  );
};

export default CompanionIdPage;
