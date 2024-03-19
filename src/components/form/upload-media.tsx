'use client';
import React from 'react';
import { z } from 'zod';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { createMedia, saveActivityLogsNotification } from '@/lib/queries';
import { Input } from '../ui/input';
import FileUpload from '../global/file-upload';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';

type Props = {
  subaccountId: string;
};
const formSchema = z.object({
  link: z.string().min(1, { message: 'Media File is required' }),
  name: z.string().min(1, { message: 'Media name is required' }),
});
const UploadMediaForm = ({ subaccountId }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      link: '',
      name: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createMedia(subaccountId, values);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Media file ${values.name} | has been uploaded`,
        subaccountId,
      });
      toast({
        title: 'Media Uploaded',
        description: 'Your media has been uploaded successfully',
      });
      if (response) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'There was an error uploading your media',
      });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media Information</CardTitle>
        <CardDescription>
          Please enter the details for your file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Media File Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Media File</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="subaccountLogo"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4"
              disabled={form.formState.isSubmitting}
            >
              <Upload size={15} className="mr-2" />
              Upload Media
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadMediaForm;
