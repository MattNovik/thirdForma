import './index.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import Select from '../../Select';
import axios from 'axios';

const beforeMaskedStateChange = ({ nextState }) => {
  let { value } = nextState;
  if (value.startsWith('+7 ')) {
    value = value.trim();
  }

  return {
    ...nextState,
    value,
  };
};

const maskPhone = [
  '+',
  '7',
  ' ',
  /[0-69]/,
  /[0-9]/,
  /[0-9]/,
  '-',
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  '-',
  /[0-9]/,
  /[0-9]/,
  '-',
  /[0-9]/,
  /[0-9]/,
];

const StudservisForm = ({ data }) => {
  const [stageCount, setStateCount] = useState(1);
  const [fileList, setFileList] = useState();

  const formikFirst = useFormik({
    initialValues: { workType: '', workSubject: '', theme: '' },
    validationSchema: Yup.object().shape({
      workType: Yup.string().required('Заполните это поле'),
      workSubject: Yup.string(),
      theme: Yup.string().required('Заполните это поле'),
    }),
    onSubmit: (values) => {
      /* console.log(values); */
      setStateCount(stageCount + 1);
    },
  });

  const formikSecond = useFormik({
    initialValues: { file: '', additionalInfo: '' },
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {
      /* console.log(values); */
      setStateCount(stageCount + 1);
    },
  });
  const formikThird = useFormik({
    initialValues: { name: '', email: '', phone: '', agreeament: true },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Заполните это поле'),
      phone: Yup.string()
        .matches(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, 'Введите ваш телефон')
        .required('Введите ваш телефон'),
      email: Yup.string().email('Введите email').required('Заполните это поле'),
      agreeament: Yup.bool().oneOf([true], 's'),
    }),
    onSubmit: (values) => {
      /* console.log(values);
      console.log(fileList);
      console.log(formikFirst.values);
      console.log(formikSecond.values.additionalInfo);
      let formData = new FormData();
      formData.append('partnerId', data.partnerId);
      axios
      .post(
        'https://dev.studservis.ru/wp-content/themes/studservice/ajax/createOrder.php',
        formData,
        {
          auth: {
            username: 'admin',
            password: 'zde3jnm4HTD.gbq@amv',
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (
          typeof response.link !== 'undefined' &&
          response.link.length > 0
        ) {
          return (window.location.href = response.link);
        }
        if (response.order_id && response.action === 'userIsset') {
          return (window.location.href =
            'https://studservis-lk.ru/' +
            'orders/newOrder/id=' +
            response.order_id +
            '/new/');
        } else {
          return (window.location.href = 'https://studservis-lk.ru/');
        }
      })
      .catch((error) => console.log('error')); */
    },
  });

  const handleNextStage = () => {
    stageCount === 1
      ? formikFirst.submitForm()
      : stageCount === 2
      ? formikSecond.submitForm()
      : formikThird.submitForm();
  };

  return (
    <div className="studservis-form">
      <div className="studservis-form__wrapper-title">
        <p className="studservis-form__title">Узнайте стоимость бесплатно</p>
        <p className="studservis-form__help-text">Выбор работы</p>
      </div>
      <form
        className={
          stageCount === 1
            ? 'studservis-form__first-form studservis-form__first-form--active'
            : 'studservis-form__first-form visibility-hidden'
        }
        onSubmit={formikFirst.handleSubmit}
      >
        <div className="studservis-form__input-wrapper">
          <Select
            name="workType"
            options={[
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' },
            ]}
            className={
              formikFirst.errors.workType
                ? 'studservis-form__input studservis-form__select studservis-form__input--error'
                : 'studservis-form__input studservis-form__select'
            }
            activeOpt={'Выберите тип работы *'}
            handle={(e) =>
              formikFirst.setFieldValue('workType', e.target.dataset.value)
            }
          />
          <span className="studservis-form__error">
            {formikFirst.errors.workType}
          </span>
        </div>
        <div className="studservis-form__input-wrapper">
          <input
            type="text"
            name="workSubject"
            id="workSubject"
            className={
              formikFirst.errors.workSubject
                ? 'studservis-form__input studservis-form__text studservis-form__input--error'
                : 'studservis-form__input studservis-form__text'
            }
            placeholder="Предмет"
            value={formikFirst.values.workSubject}
            onChange={formikFirst.handleChange}
          />
          <span className="studservis-form__error">
            {formikFirst.errors.workSubject}
          </span>
        </div>
        <div className="studservis-form__input-wrapper">
          <input
            id="theme"
            name="theme"
            type="text"
            className={
              formikFirst.errors.theme
                ? 'studservis-form__input studservis-form__text studservis-form__input--error'
                : 'studservis-form__input studservis-form__text'
            }
            placeholder="Тема *"
            value={formikFirst.values.theme}
            onChange={formikFirst.handleChange}
          />
          <span className="studservis-form__error">
            {formikFirst.errors.theme}
          </span>
        </div>
      </form>
      <form
        className={
          stageCount === 2
            ? 'studservis-form__second-form studservis-form__second-form--active'
            : 'studservis-form__second-form visibility-hidden'
        }
        onSubmit={formikSecond.handleSubmit}
      >
        <div className="studservis-form__input-wrapper">
          <label
            htmlFor="file"
            className="studservis-form__file-label"
            data-placeholder="Прикрепите файл"
          >
            <input
              type="file"
              className="studservis-form__input studservis-form__file visibility-hidden"
              placeholder="Прикрепите файл"
              multiple
              name="file"
              id="file"
              onChange={(e) => {
                if (fileList && fileList.length) {
                  const dt = new DataTransfer();
                  let oldFiles = fileList;
                  let newFiles = e.target.files;
                  for (let i = 0; i < oldFiles.length; i++) {
                    dt.items.add(oldFiles[i]);
                  }
                  for (let i = 0; i < newFiles.length; i++) {
                    dt.items.add(newFiles[i]);
                  }

                  setFileList(dt.files);
                } else {
                  setFileList(e.target.files);
                }
              }}
            />
          </label>
          <span className="studservis-form__error">
            {formikSecond.errors.file}
          </span>
          {fileList && fileList.length ? (
            <ul className="studservis-form__file-list">
              {[...fileList].map((item, index) => {
                return (
                  <li className="studservis-form__file-item" key={index}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="studservis-form__input-wrapper">
          <textarea
            name="additionalInfo"
            id="additionalInfo"
            className={
              formikSecond.errors.additionalInfo
                ? 'studservis-form__input studservis-form__textarea studservis-form__input--error'
                : 'studservis-form__input studservis-form__textarea'
            }
            value={formikSecond.values.additionalInfo}
            onChange={formikSecond.handleChange}
            placeholder="Введите доп. требования"
          />
          <span className="studservis-form__error">
            {formikSecond.errors.additionalInfo}
          </span>
        </div>
      </form>
      <form
        className={
          stageCount === 3
            ? 'studservis-form__third-form studservis-form__third-form--active'
            : 'studservis-form__third-form visibility-hidden'
        }
        onSubmit={formikThird.handleSubmit}
      >
        <div className="studservis-form__input-wrapper">
          <input
            type="text"
            className={
              formikThird.errors.name
                ? 'studservis-form__input studservis-form__text studservis-form__input--error'
                : 'studservis-form__input studservis-form__text'
            }
            placeholder="Ваше имя *"
            value={formikThird.values.name}
            name="name"
            id="name"
            onChange={formikThird.handleChange}
          />
          <span className="studservis-form__error">
            {formikThird.errors.name}
          </span>
        </div>
        <div className="studservis-form__input-wrapper">
          <input
            type="text"
            className={
              formikThird.errors.email
                ? 'studservis-form__input studservis-form__text studservis-form__input--error'
                : 'studservis-form__input studservis-form__text'
            }
            placeholder="Ваш e-mail *"
            name="email"
            id="email"
            value={formikThird.values.email}
            onChange={formikThird.handleChange}
          />
          <span className="studservis-form__error">
            {formikThird.errors.email}
          </span>
        </div>
        <div className="studservis-form__input-wrapper">
          <InputMask
            mask={maskPhone}
            maskPlaceholder="_"
            beforeMaskedStateChange={beforeMaskedStateChange}
            value={formikThird.values.phone}
            className={
              formikThird.errors.phone
                ? 'studservis-form__input studservis-form__text studservis-form__input--error'
                : 'studservis-form__input studservis-form__text'
            }
            type="text"
            name="phone"
            id="phone"
            placeholder="+7 (___) ___-__-__ *"
            onChange={formikThird.handleChange}
          />
          <span className="studservis-form__error">
            {formikThird.errors.phone}
          </span>
        </div>
      </form>
      <input
        name="agreeament"
        defaultChecked={formikThird.values.agreeament}
        onChange={formikThird.handleChange}
        className={
          formikThird.errors.agreeament
            ? 'studservis-form__agreeament visibility-hidden error'
            : 'studservis-form__agreeament visibility-hidden'
        }
        id="agreeament"
        type="checkbox"
      />
      <label htmlFor={'agreeament'}>
        Нажимая кнопку "Узнать стоимость", вы соглашаетесь с{' '}
        <a href="#some">политикой конфиденциальности</a>
      </label>
      <div className="studservis-form__buttons-wrapper">
        <button
          type="button"
          className="studservis-form__button-next-stage"
          onClick={handleNextStage}
        >
          {stageCount !== 3 ? 'Продолжить' : 'Отправить'}
        </button>
        {stageCount === 2 ? (
          <button
            className="studservis-form__button-skip"
            onClick={() => setStateCount(stageCount + 1)}
          >
            Пропустить
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default StudservisForm;
