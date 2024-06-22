import React, { useEffect, useState } from "react";
import { Galleria } from "primereact/galleria";
import {
  AccountConfig,
  DirectoryConfig,
  ImageWithPath,
} from "../backend_types";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { useImagesWithPaths } from "./hooks";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const ImageForm: React.FC<{ image: ImageWithPath["image"], initialCaption: string }> = ({ image, initialCaption }) => {
  const [caption, setCaption] = useState(initialCaption);

  return (
    <>
      <Image src={image} alt="Pending image" width="400" height="600" />

      <Card>
        <form>
          <label>Caption</label>
          <div>
            <InputTextarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <Button label="Save" />
        </form>
      </Card>
    </>
  );
};

const HomePage = () => {
  const imagesWithPaths = useImagesWithPaths();

  return (
    <div>
      <Galleria
        value={imagesWithPaths || [] as ImageWithPath[]}
        numVisible={5}
        item={({ path, image, caption }) => {
          return (
            <div className="p-2 grid grid-cols-3 gap-6">
              <div />

              <ImageForm key={path} image={image} initialCaption={caption} />
            </div>
          )
        }}
        thumbnail={({ image }) => (
          <Image src={image} alt="Pending image" width="100" height="150" />
        )}
      />
    </div>
  );
};

export default HomePage;
