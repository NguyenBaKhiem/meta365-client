import blog_icon from "@Assets/images/blog.png";
import global_icon from "@Assets/images/global.png";
import mint_ntf from "@Assets/images/mint-nft.png";
import profile_icon from "@Assets/images/profile-circle.png";
import shop_icon from "@Assets/images/shop.png";

export let sidebar = [
  {
    name: "Blog",
    link: "",
    icon: blog_icon,
    roles: ["godAccount", "editCreator"],
    showChildren: false,
    children: [
      { name: "All Posts", link: "",request:"" },
      { name: "Post", link: "", request:"public" },
      { name: "Draft", link: "", request:"private" },
      { name: "Trash", link: "", request:"deleted" },
    ],
  },
  {
    name: "360 Tour",
    link: "project",
    icon: global_icon,
    roles: ["godAccount", "editCreator"],
  },
  {
    name: "Lands",
    link: "land",
    icon: shop_icon,
    roles: ["godAccount", "editCreator"],
    showChildren: false,
    children: [
      { name: "All Lands", link: "land" },
      // { name: "Post", link: "land/posted" },
    ],
  },
  {
    name: "Mint NFTs",
    link: "mint",
    icon: mint_ntf,
    roles: ["godAccount"],
    
  },

  {
    name: "Account",
    link: "account",
    roles: ["godAccount"],
    icon: profile_icon,
    showChildren: false,
    children: [
      { name: "All Accounts", link: "account" },
      { name: "Blocked Accounts ", link: "account/blocked" },
    ],
  },
];
