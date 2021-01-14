import React, { ReactElement, SyntheticEvent } from 'react';

type InfoTooltipProps = {
  name: string
  icon: string
  title: string
  isOpen: boolean
  onClose(event: SyntheticEvent): void
};

const InfoTooltip: React.FunctionComponent<InfoTooltipProps> = ({
  name,
  icon,
  title,
  isOpen,
  onClose
}): ReactElement => {
  return (
    <div className={`popup popup_task_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container">
        <img className="popup__icon-info" src={icon} alt={name} />
        <h2 className="popup__title popup__title_component_info">{title}</h2>
        <button className="popup__icon-close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
