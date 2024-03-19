'use client';
import ContactUserForm from '@/components/form/contact-user';
import CustomModal from '@/components/global/custom-modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
  subaccountId: string;
};

const CreateContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal();
  const handleCreateContact = () => {
    setOpen(
      <CustomModal
        title="Create Or Update Contact information"
        subheading="Contacts are like customers or clients"
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>,
    );
  };
  return (
    <Button onClick={handleCreateContact} className="mt-2">
      <Plus size={18} className="mr-2" />
      Create Contact
    </Button>
  );
};

export default CreateContactButton;
