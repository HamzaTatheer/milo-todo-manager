import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Grid,
} from '@mantine/core';
import useUserStore from '@/models/user';
import { useRouter } from 'next/router';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

export default function AuthenticationForm(props: PaperProps) {
  const router = useRouter();
  const [type, toggle] = useToggle(['login', 'register']);
  const {user,login,signup} = useUserStore();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  let handleSubmit = () =>{
    
    if(type === 'login')
      login(form.values.email,form.values.password).then(()=>{
        router.push("/todo");
      });
    if(type === 'register')
      signup(form.values.email,form.values.name,form.values.password).then(()=>{
        router.push("/todo");
      });

  }

  return (
    <Grid>
      <Grid.Col span={12} md={4} offsetMd={4}>
        <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500} style={{textAlign:'center'}}>
        Welcome to Milo Todo
      </Text>

      {/* <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group> */}
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {/* {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )} */}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          {type === 'register' ?
          <Button loading={user.loading} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
          {upperFirst(type)}
          </Button>            
          :
          <Button loading={user.loading} type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
          {upperFirst(type)}
          </Button>
          
          }



        </Group>
      </form>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}