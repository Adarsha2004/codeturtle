# CodeTurtle 🐢

An AI-powered code review bot that automatically analyzes pull requests and provides intelligent feedback using OpenAI's GPT-4.

## Features

- 🤖 **Automated Code Review**: Analyzes PR diffs and provides detailed feedback
- 🔍 **Context-Aware Analysis**: Fetches relevant code context from the repository
- 💬 **GitHub Integration**: Posts review comments directly to pull requests
- 🏖️ **Sandboxed Execution**: Safe code analysis using E2B sandboxes
- ⚡ **Real-time Processing**: Responds to GitHub webhooks instantly

## Architecture

```
src/
├── server.ts          # Express server and webhook endpoints
├── routes/
│   └── webhook.ts     # GitHub webhook handler
├── agent/
│   ├── index.ts       # Main agent orchestration
│   ├── llm.ts         # OpenAI integration
│   ├── context.ts     # Code context extraction
│   └── sandbox.ts     # E2B sandbox management
└── github/
    └── index.ts       # GitHub API integration
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key
- GitHub Personal Access Token
- E2B API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codeturtle.git
   cd codeturtle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   GITHUB_TOKEN=your_github_token_here
   E2B_API_KEY=your_e2b_api_key_here
   PORT=3000
   ```

4. **Build and start the server**
   ```bash
   npm run build
   npm start
   ```

## Configuration

### GitHub Webhook Setup

1. Go to your repository settings on GitHub
2. Navigate to **Webhooks** → **Add webhook**
3. Set the payload URL to: `https://your-domain.com/webhook/github`
4. Select **application/json** as content type
5. Choose **Pull requests** events
6. Save the webhook

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 access | ✅ |
| `GITHUB_TOKEN` | GitHub Personal Access Token with repo permissions | ✅ |
| `E2B_API_KEY` | E2B API key for sandbox execution | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |

## Usage

Once configured, CodeTurtle will automatically:

1. **Listen for PR events** via GitHub webhooks
2. **Fetch PR diff and files** from the GitHub API
3. **Clone the repository** in a secure E2B sandbox
4. **Extract code context** from relevant files
5. **Analyze the changes** using GPT-4
6. **Post review comments** back to the PR

## API Endpoints

### `POST /webhook/github`
Handles GitHub webhook events for pull request analysis.

**Supported Events:**
- `pull_request.opened`
- `pull_request.synchronize`

## Development

### Project Structure

- **Server Layer** (`server.ts`): Express.js server with webhook endpoints
- **Route Layer** (`routes/`): HTTP request handlers
- **Agent Layer** (`agent/`): Core business logic and AI integration
- **GitHub Layer** (`github/`): GitHub API interactions
- **Sandbox Layer** (`agent/sandbox.ts`): Secure code execution environment

### Key Dependencies

- **Express**: Web server framework
- **@octokit/rest**: GitHub API client
- **openai**: OpenAI API client
- **@e2b/code-interpreter**: Secure sandbox execution
- **dotenv**: Environment variable management

## Security

- All code analysis happens in isolated E2B sandboxes
- GitHub tokens are securely managed via environment variables
- Input validation prevents command injection attacks
- No sensitive data is logged or stored

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/codeturtle/issues) page
2. Create a new issue with detailed information
3. Include relevant logs and configuration details

---

Made with ❤️ by the CodeTurtle team