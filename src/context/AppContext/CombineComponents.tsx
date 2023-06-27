import { ConfigProviderProps } from '@auth0/nextjs-auth0/dist/client/use-config';
import React, { ComponentProps, FC } from 'react';

export const combineComponents = (...components: FC<ConfigProviderProps>[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return (props: React.PropsWithChildren<ComponentProps<typeof CurrentComponent>>) => {
        const {children, ...restProps } = props;
        return (
          <AccumulatedComponents {...restProps}>
            <CurrentComponent >{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }: React.PropsWithChildren<{}>) => <>{children}</>,
  );
};
