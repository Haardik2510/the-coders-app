
import React from 'react';
import { Code } from 'lucide-react';
import CollabEditor from './CollabEditor';
import { TabsContent } from "@/components/ui/tabs";

interface CollabEditorSectionProps {
  groupId: string;
}

const CollabEditorSection = ({ groupId }: CollabEditorSectionProps) => {
  return (
    <TabsContent value="code" className="border rounded-lg border-gray-800">
      <CollabEditor groupId={groupId} />
    </TabsContent>
  );
};

export default CollabEditorSection;
