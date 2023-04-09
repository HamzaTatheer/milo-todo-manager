import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useUserStore from '@/models/user';
import Image from 'next/image'
import { useRouter } from 'next/router';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string, private?: boolean }[];
}

export default function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const router = useRouter();
  const cleanPath = router.asPath.split('#')[0].split('?')[0];
  const { user,logout } = useUserStore();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const items = links.map((link) => {
    let showItem = link.private == undefined || (link.private == false && user.data == null ) || (link.private == true && user.data != null);

    if (showItem) {

      if(link.label == 'logout'){
        return (
          <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: cleanPath === link.link })}
            onClick={(event) => {
              event.preventDefault();
              logout();
              close();
            }}
          >
            {link.label}
          </a>
        );
      }


      return (
        <a
          key={link.label}
          href={link.link}
          className={cx(classes.link, { [classes.linkActive]: cleanPath === link.link })}
          onClick={(event) => {
            event.preventDefault();
            router.push(link.link);
            close();
          }}
        >
          {link.label}
        </a>
      );
    }
    else {
      return null;
    }
  });

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <Group>
          <Image src={'/milo_icon.png'} alt={''} width={45} height={45}/>
          Milo Todo
        </Group>


        <Group spacing={5} className={classes.links}>
          {items}
        </Group>


        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}