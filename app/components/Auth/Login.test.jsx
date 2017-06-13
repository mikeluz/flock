import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Login} from './Login'

/* global describe it beforeEach */
describe('<Login />', () => {
  let root
  beforeEach('render the root', () =>
    // wrap component being tested in <MuiThemeProvider> ???
    root = render(<MuiThemeProvider><Login/></MuiThemeProvider>)
  )

  it('shows a login form', () => {
    // .find('NameTag')
    expect(root.find('TextField[name="username"]')).to.have.length(1)
    expect(root.find('TextField[name="password"]')).to.have.length(1)
  })

  it('shows a password field', () => {
    const pw = root.find('TextField[name="password"]')
    expect(pw).to.have.length(1)
    expect(pw.at(0)).to.have.attr('type').equals('password')
  })

  it('has a login button', () => {
    const submit = root.find('TextField[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const login = spy()
    const root = shallow(<Login login={login}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'bones@example.com'},
        password: {value: '12345'},
      }
    }

    beforeEach('submit', () => {
      login.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.username.value,
        submitEvent.target.password.value,
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})
