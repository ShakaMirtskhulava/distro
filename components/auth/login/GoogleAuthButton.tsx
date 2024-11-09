import Button from "@/components/ui/Button";
import Image from "next/image";
import googleIcon from "../../../public/images/icons/icons8-google.svg";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/constants/constants";

export default function GoogleAuthButton() {
  const router = useRouter();
  const googleAuthAddress = `${API_URL}/v1/User/Google-Login`;

  const googleButtonHandler = () => {
    router.push(googleAuthAddress);
  };

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        className="flex w-full items-center justify-center gap-2 border border-gray-200 bg-white text-secondary"
        onClick={googleButtonHandler}
      >
        <Image src={googleIcon} alt="Google icon" width={30} height={30} />
        Continue with Google
      </Button>
    </div>
  );
}
