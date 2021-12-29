import RouteLink from '@src/routing/RouteLink'
import { indexRoute } from '@src/routing/routes'
import {
  alignItems,
  boxShadow,
  classnames,
  display,
  fontSize,
  height,
  justifyContent,
  margin,
  padding,
  textColor,
  transitionProperty,
  width,
} from '@src/ui/styles/classnames'
import React from 'react'
import GitHubIcon from '../icons/GitHub'

type HeaderProps = {
  compact: boolean
}

function Header({ compact }: HeaderProps): React.ReactElement {
  return (
    <header
      className={classnames(
        boxShadow('shadow'),
        padding('p-1', { 'sm:p-2': !compact }),
        display('flex'),
        alignItems('items-center'),
        justifyContent('justify-between'),
        transitionProperty('transition-all'),
      )}
    >
      <RouteLink
        route={indexRoute()}
        title="Go to Sequelize UI Home"
        className={classnames(display('inline-block'))}
      >
        <h1
          className={classnames(
            fontSize({ 'text-xl': !compact, 'sm:text-2xl': !compact, 'text-base': compact }),
            display('flex'),
            alignItems('items-center'),
          )}
        >
          <img
            width="50px"
            height="50px"
            className={classnames(
              display('inline'),
              height({ 'h-6': !compact, 'sm:h-8': !compact, 'h-5': compact }),
              width({ 'w-6': !compact, 'sm:w-8': !compact, 'w-5': compact }),
              margin('mx-2'),
            )}
            alt=""
            src="https://sequelizeui.app/static/images/sequelize-ui-tiny-white.svg"
          />
          Sequelize UI
        </h1>
      </RouteLink>
      <a
        title="GitHub"
        className={classnames(padding('px-2'), textColor('hover:text-blue-700'))}
        href="https://github.com/tomjschuster/sequelize-ui"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon size={6} smSize={compact ? 6 : 8} />
      </a>
    </header>
  )
}

export default Header
