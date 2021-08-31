import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import authOperations from '../../redux/auth/authOperations';
import styles from './RegistrationForm.module.scss';
import { validate } from 'indicative/validator';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { alert, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaults.delay = '3000';
defaults.width = '280px';

const progressBarClass = state => {
  if (state.name && !state.email && !state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyOne} ${styles.formFilled}`}></span>;
  }
  if (!state.name && state.email && !state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyOne} ${styles.formFilled}`}></span>;
  }
  if (!state.name && !state.email && state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyOne} ${styles.formFilled}`}></span>;
  }
  if (!state.name && !state.email && !state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyOne} ${styles.formFilled}`}></span>;
  }

  if (state.name && state.email && !state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyTwo} ${styles.formFilled}`}></span>;
  }
  if (state.name && !state.email && state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyTwo} ${styles.formFilled}`}></span>;
  }
  if (state.name && !state.email && !state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyTwo} ${styles.formFilled}`}></span>;
  }
  if (!state.name && state.email && state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyTwo} ${styles.formFilled}`}></span>;
  }
  if (!state.name && state.email && !state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyTwo} ${styles.formFilled}`}></span>;
  }
  if (!state.name && !state.email && state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyTwo} ${styles.formFilled}`}></span>;
  }

  if (state.name && state.email && state.password && !state.repeatPassword) {
    return <span className={`${styles.OnlyThree} ${styles.formFilled}`}></span>;
  }
  if (state.name && state.email && !state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyThree} ${styles.formFilled}`}></span>;
  }
  if (state.name && !state.email && state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyThree} ${styles.formFilled}`}></span>;
  }
  if (!state.name && state.email && state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyThree} ${styles.formFilled}`}></span>;
  }

  if (state.name && state.email && state.password && state.repeatPassword) {
    return <span className={`${styles.OnlyFour} ${styles.formFilled}`}></span>;
  }
};

// const progressBar = progressBarClass(state);

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const dispatch = useDispatch();

  const handleName = e => {
    setName(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleRepeatPassword = e => {
    setRepeatPassword(e.target.value);
  };

  const createUserToRegister = e => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert({
        text: `Passwords are not equal!`,
      });
      setPassword('');
      setRepeatPassword('');
      return;
    }

    const rules = {
      username: 'min:1|max:12',
      email: 'required|email',
      password: 'required|min:8|max:12',
    };

    const messages = {
      required: 'Make sure to enter the field value',
      email: 'Enter valid email address, please',
      min: 'Too small',
      max: 'Too big',
    };

    const user = {
      name,
      email,
      password,
    };

    const data = {
      username: name,
      email,
      password,
    };

    validate(data, rules, messages)
      .then(() => {
        setValidName(true);
        setValidEmail(true);
        setValidPassword(true);

        dispatch(authOperations.registerUser(user));

        setName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
      })
      .catch(error => {
        if (error[0].field && error[0].field === 'name') {
          setValidName(false);
          setName('');
          alert({
            text: `${error[0].message}`,
          });
        }
        if (error[0].field && error[0].field === 'email') {
          setValidEmail(false);
          setEmail('');
          alert({
            text: `${error[0].message}`,
          });
        }
        if (error[0].field && error[0].field === 'password') {
          setValidPassword(false);
          setPassword('');
          setRepeatPassword('');
          alert({
            text: `${error[0].message}`,
          });
        }
        console.log(error);
      });
  };

  return (
    <div className={styles.mainDiv}>
      <div>
        <p className={styles.wallet}>Wallet</p>
      </div>
      <form className={styles.form} onSubmit={createUserToRegister}>
        <div className={styles.labelsDiv}>
          <label className={styles.label}>
            <span className={`${styles.span} ${styles.span}`}>
              <AccountBoxIcon></AccountBoxIcon>
            </span>
            <input
              type="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleName}
              className={
                validName
                  ? `${styles.input} `
                  : `${styles.input} ${styles.inputError}`
              }
            ></input>
          </label>
          <label className={styles.label}>
            <span className={`${styles.span} ${styles.mailSpan}`}>
              <MailOutlineSharpIcon></MailOutlineSharpIcon>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              className={
                validEmail
                  ? `${styles.input} `
                  : `${styles.input} ${styles.inputError}`
              }
            ></input>
          </label>
          <label className={styles.label}>
            <span className={styles.span}>
              <LockSharpIcon></LockSharpIcon>
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              className={
                validPassword
                  ? `${styles.input} `
                  : `${styles.input} ${styles.inputError}`
              }
            ></input>
          </label>
          <label className={styles.label}>
            <span className={styles.span}>
              <LockSharpIcon></LockSharpIcon>
            </span>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={handleRepeatPassword}
              className={
                password !== repeatPassword || repeatPassword === ''
                  ? `${styles.input} ${styles.inputRepeat}`
                  : `${styles.input}${styles.inputRepeat} ${styles.inputError}`
              }
            ></input>
            <div>
              {progressBarClass({ name, email, password, repeatPassword })}
            </div>
          </label>
        </div>

        <button className={`${styles.button} ${styles.enter}`} type="submit">
          Register
        </button>
        <NavLink
          className={`${styles.button} ${styles.register}`}
          to={routes.login}
        >
          Login
        </NavLink>
      </form>
    </div>
  );
}
