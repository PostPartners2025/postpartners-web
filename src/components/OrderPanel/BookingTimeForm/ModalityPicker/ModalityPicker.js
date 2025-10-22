import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from '../../../../util/reactIntl';
import { FieldSelect } from '../../../../components';
import css from './ModalityPicker.module.css';

const DEFAULT_MODALITY_NAME = 'default-modality-name';

const FieldHidden = props => {
  const { name, ...rest } = props;
  return (
    <Field id={name} name={name} type="hidden" className={css.hidden} {...rest}>
      {fieldRenderProps => <input {...fieldRenderProps?.input} />}
    </Field>
  );
};

const ModalityPicker = props => {
  const intl = useIntl();
  const { modalities, onModalityChange, disabled } = props;

  return modalities?.length > 0 ? (
    <FieldSelect
      name="modalityName"
      id="modality"
      className={css.modalityFieldSelect}
      selectClassName={css.modalitySelect}
      label={intl.formatMessage({ id: 'ModalityPicker.modalityLabel' })}
      onChange={onModalityChange}
      disabled={disabled}
      showLabelAsDisabled={disabled}
    >
      <option disabled value="" key="unselected">
        {intl.formatMessage({ id: 'ModalityPicker.modalityUnselected' })}
      </option>
      {modalities.map(modality => (
        <option value={modality.name} key={modality.name}>
          {modality.name}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default ModalityPicker;
