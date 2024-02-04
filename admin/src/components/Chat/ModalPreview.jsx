import { Modal } from "antd";
import SETTINGS from "../../setting.json";

const ModalPreview = ({ isOpen, setIsOpen, image }) => {
  return (
    <Modal
      open={isOpen}
      title={null}
      footer={null}
      onCancel={() => setIsOpen(false)}
    >
      <img
        src={`${SETTINGS.BASE_URL}${image}`}
        alt="ảnh"
        className="h-auto w-[100%]"
      />
    </Modal>
  );
};

export default ModalPreview;
