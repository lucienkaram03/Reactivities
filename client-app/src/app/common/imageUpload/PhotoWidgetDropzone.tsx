import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';
interface Props {
    setFiles : (files : any) => void ;
}
export default function  PhotoWidgetDropzone({setFiles} : Props) {
//We're going to create a style for when the drop zone is inactive and we'll create an additional style for when it's active.
const dzStyles = {
    border: 'dashed 3px #eee' ,
    borderColor: '#eee' ,
    borderRadius: '5px' ,
    paddingTop: '30px' ,
    textAlign: 'center' as const ,
    height: 200
}

const dzActive = {
    borderColor : 'green'
}

  const onDrop = useCallback((acceptedFiles:object[]) => {
   setFiles(acceptedFiles.map((file : any) => Object.assign(file , { //looping over each file in the accepted file array and getting these files and giving a preview of the file
    preview : URL.createObjectURL(file) //addimg an additional property to the file
})))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()} /> {/* this is the input where we drop our image after we dragged it, below we are styling it */}
    <Icon name='upload' size='huge' />
    <Header content='Drop image here' />
    </div>
  )
}