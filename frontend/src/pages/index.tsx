import { Container } from '@mantine/core';
import { Head } from 'next/document';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  return (
    <Container>




      <header>
        <h1>Welcome to Todo List App</h1>
        <p>Your personal task manager with a smart assistant</p>
      </header>

      <main>
        <section>
          <h2>What is Todo List App?</h2>
          <p>Todo List App is a web-based task manager that helps you keep track of all your tasks and get them done on time. With its simple and intuitive interface, you can add new tasks, set due dates, and prioritize them based on their importance.</p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li><strong>Task Management:</strong> Add new tasks, set due dates, and prioritize them based on their importance.</li>
            <li><strong>Smart Assistant:</strong> Get assistance with your tasks from our smart assistant.</li>
            <li><strong>User Accounts:</strong> Create your own account and access your tasks from anywhere.</li>
            <li><strong>Mobile Responsive:</strong> Access your tasks on-the-go with our mobile responsive design.</li>
          </ul>
        </section>

        <section>
          <h2>Get Started</h2>
          <p>Ready to get started with Todo List App? Simply sign up for a free account and start managing your tasks today!</p>
          <a href="#" className="button">Sign Up</a>
        </section>
      </main>

      <footer style={{textAlign:'center'}}>
        <p>&copy; 2023 Todo List App. All rights reserved.</p>
      </footer>

    </Container>
  );
};

export default Index;
