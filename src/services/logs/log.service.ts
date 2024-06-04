import { log } from 'console';
import { colors } from '~/constants';

class LogService {
    static reset(message: string): void {
        log(`${colors.reset}${message}${colors.reset}`);
    }

    static bright(message: string): void {
        log(`${colors.bright}${message}${colors.reset}`);
    }

    static dim(message: string): void {
        log(`${colors.dim}${message}${colors.reset}`);
    }

    static underscore(message: string): void {
        log(`${colors.underscore}${message}${colors.reset}`);
    }

    static blink(message: string): void {
        log(`${colors.blink}${message}${colors.reset}`);
    }

    static reverse(message: string): void {
        log(`${colors.reverse}${message}${colors.reset}`);
    }

    static hidden(message: string): void {
        log(`${colors.hidden}${message}${colors.reset}`);
    }

    static black(message: string): void {
        log(`${colors.black}${message}${colors.reset}`);
    }

    static red(message: string): void {
        log(`${colors.red}${message}${colors.reset}`);
    }

    static green(message: string): void {
        log(`${colors.green}${message}${colors.reset}`);
    }

    static yellow(message: string): void {
        log(`${colors.yellow}${message}${colors.reset}`);
    }

    static blue(message: string): void {
        log(`${colors.blue}${message}${colors.reset}`);
    }

    static magenta(message: string): void {
        log(`${colors.magenta}${message}${colors.reset}`);
    }

    static cyan(message: string): void {
        log(`${colors.cyan}${message}${colors.reset}`);
    }

    static white(message: string): void {
        log(`${colors.white}${message}${colors.reset}`);
    }

    static bgBlack(message: string): void {
        log(`${colors.bgBlack}${message}${colors.reset}`);
    }

    static bgRed(message: string): void {
        log(`${colors.bgRed}${message}${colors.reset}`);
    }

    static bgGreen(message: string): void {
        log(`${colors.bgGreen}${message}${colors.reset}`);
    }

    static bgYellow(message: string): void {
        log(`${colors.bgYellow}${message}${colors.reset}`);
    }

    static bgBlue(message: string): void {
        log(`${colors.bgBlue}${message}${colors.reset}`);
    }

    static bgMagenta(message: string): void {
        log(`${colors.bgMagenta}${message}${colors.reset}`);
    }

    static bgCyan(message: string): void {
        log(`${colors.bgCyan}${message}${colors.reset}`);
    }

    static bgWhite(message: string): void {
        log(`${colors.bgWhite}${message}${colors.reset}`);
    }
}

export { LogService };