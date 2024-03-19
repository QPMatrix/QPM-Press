'use client';
import React from 'react';
import PipelineInfobar from './pipeline-infobar';
import { Pipeline } from '@prisma/client';
import CreatePipelineForm from '@/components/form/create-pipeline';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deletePipeline, saveActivityLogsNotification } from '@/lib/queries';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Loading from '@/components/global/loading';

const PipelineSettings = ({
  pipelineId,
  subaccountId,
  pipelines,
}: {
  pipelineId: string;
  subaccountId: string;
  pipelines: Pipeline[];
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  return (
    <AlertDialog>
      <div>
        <div className="flex items-center justify-between mb-4">
          <AlertDialogTrigger asChild>
            <Button variant={'destructive'}>
              {loading ? <Loading /> : 'Delete Pipeline'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    setLoading(true);
                    const response = await deletePipeline(pipelineId);
                    await saveActivityLogsNotification({
                      agencyId: undefined,
                      description: `Deleted a Pipeline | ${response.name}`,
                      subaccountId,
                    });
                    toast({
                      title: 'Deleted',
                      description: 'Pipeline is deleted',
                    });
                    router.replace(`/subaccount/${subaccountId}/pipelines`);
                  } catch (error) {
                    setLoading(false);
                    toast({
                      variant: 'destructive',
                      title: 'Oppse!',
                      description: 'Could Delete Pipeline',
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>

        <CreatePipelineForm
          subAccountId={subaccountId}
          defaultData={pipelines.find((p) => p.id === pipelineId)}
        />
      </div>
    </AlertDialog>
  );
};

export default PipelineSettings;
