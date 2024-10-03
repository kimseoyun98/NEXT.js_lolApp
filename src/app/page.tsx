import { Metadata } from "next";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "리그오브레전드 정보 앱",
  description: "리그오브레전드 정보 앱입니다",
};

const Page = () => {
  return <HomePage />;
};

export default Page;
