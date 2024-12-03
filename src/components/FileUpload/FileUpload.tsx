import { Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import { FileUpload as FileUploadBase } from "~/components/ui/file-upload";

export function FileUpload(props: FileUploadBase.RootProps) {
  return (
    <FileUploadBase.Root maxFiles={1} {...props}>
      <FileUploadBase.Context>
        {({ acceptedFiles }) => {
          return (
            <>
              {acceptedFiles.length < 1 ? (
                <FileUploadBase.Dropzone css={{ minH: 1 }}>
                  <FileUploadBase.Trigger asChild>
                    <Button size="sm">Drop an exported file</Button>
                  </FileUploadBase.Trigger>
                </FileUploadBase.Dropzone>
              ) : null}
              <FileUploadBase.ItemGroup>
                {acceptedFiles.map((file) => (
                  <FileUploadBase.Item
                    key={file.name}
                    file={file}
                    css={{ p: 2 }}
                  >
                    <FileUploadBase.ItemName />
                    <FileUploadBase.ItemSizeText />
                    <FileUploadBase.ItemDeleteTrigger asChild>
                      <Trash size={16} />
                    </FileUploadBase.ItemDeleteTrigger>
                  </FileUploadBase.Item>
                ))}
              </FileUploadBase.ItemGroup>
              <FileUploadBase.HiddenInput />
            </>
          );
        }}
      </FileUploadBase.Context>
    </FileUploadBase.Root>
  );
}
