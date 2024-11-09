import Image from "next/image";
import noImage from "../../public/images/icons/no-image.svg";

interface OrderCellImageProps {
  productImage: ImageResponsePayload;
}

export default function OrderCellImage({ productImage }: OrderCellImageProps) {
  return (
    <>
      <Image
        src={productImage.url ? productImage.url : noImage}
        alt="Order Image"
        width={100}
        height={60}
        className="h-[60px] w-[100px] rounded-lg object-cover"
      />
    </>
  );
}
