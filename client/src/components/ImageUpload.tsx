import React from 'react'
import { Upload } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface';
interface IProps {
  curImgUrl?: string
  onChange?: (newUrl: string) => void
}
export default function ImageUpload(props: IProps) {
  function getUploadContent() {
    if (props.curImgUrl) {
      return null;
    } else {
      return <div>点击上传</div>
    }
  }
  function getFileList(): UploadFile[] {
    if (props.curImgUrl) {
      return [{
        uid: props.curImgUrl,
        name: props.curImgUrl,
        url: props.curImgUrl
      }]
    } else {
      return []
    }
  }
  return (
    <div>
      <Upload
        accept={".png,.jpg,.jpeg,.svg"}
        action={"http://localhost:3000/upload"}
        name={"img"}
        listType={"picture-card"}
        fileList={getFileList()}
        // onChange={(info) => {
        //   console.log(info)
        // }}
        customRequest={async (p: any) => {
          const formData = new FormData();
          formData.append(p.filename, p.file);
          const request = new Request(p.action, {
            method: "post",
            body: formData,
            
          })
          const resp = await fetch(request).then(res => {
            return res.json();
          })
          if(props.onChange)
          props.onChange(resp.path);

        }}
        onRemove={() => {
          if(props.onChange)
          props.onChange("");
        }}
      >
        {getUploadContent()}
      </Upload>
    </div>
  )
}
