export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    const formDatas = new FormData(event.target);
    const acquisitionChannel = formDatas.getAll('acquisition');
    const data = Object.fromEntries(formDatas.entries());
    data.acquisition = acquisitionChannel;
    /* 
    The Object.fromEntries() static method transforms a list of key-value pairs into an object.
    formDatas.entries()로는 같은 이름을 가진 input(checkbox, radio)는 가져오지 않는다
    따라서, `formDatas.getAll('acquisition')`와 같이 해당 input만 따로 받아와서 합쳐준다.
     */
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
        />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            name='first-name'
          />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            name='last-name'
          />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select
          id='role'
          name='role'
        >
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='other'
            name='acquisition'
            value='other'
          />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        <button
          type='reset'
          className='button button-flat'
        >
          Reset
        </button>
        <button
          type='submit'
          className='button'
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
