import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;
  if (!user.Agency) return;
  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((sub) => sub.id === id);
  const isWhiteLabelAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/assets/QubeFlow-logo.svg";
  if (!isWhiteLabelAgency) {
    if (type === "subaccount") {
      sideBarLogo =
        user.Agency.SubAccount.find((sub) => sub.id === id)?.subAccountLogo ||
        user.Agency.agencyLogo;
    }
  }
  const sideBarOption =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((sub) => sub.id === id)?.SidebarOption ||
        [];
  const subaccounts = user.Agency.SubAccount.filter((sub) =>
    user.Permissions.find((perm) => perm.subAccountId === sub.id && perm.access)
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sideBarLogo={sideBarLogo}
        sideBarOption={sideBarOption}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sideBarLogo={sideBarLogo}
        sideBarOption={sideBarOption}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
